import { useContext, useState, useEffect } from 'react';
import './AddSales.css';

import ThemeContext from '../../contexts/themeContext';
import NavBar from '../../components/NavBar1/NavBar';
import NewSale from '../../components/NewSale/NewSale';


export default function AddSales(props) {

    const themeContext = useContext(ThemeContext);

    const [saleItems, setSaleItems] = useState([]);
    const [business, setBusiness] = useState(null);
    const [loadingBusiness, setLoadingBusiness] = useState(true);

    useEffect(() => {

        fetch(themeContext.APIURL + 'business/findBusiness', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": themeContext.token
            },
            body: JSON.stringify({
                business: themeContext.employeeBusiness
            }),
            mode: 'cors',
        })
        .then(res => {
            return res.json();
        })
        .then(res => {

            if (res.ok) {
                setBusiness(res.business);
            }

            setLoadingBusiness(false);
        })
        .catch(error => {

            console.error(error);
            setLoadingBusiness(false);
        });

    }, [
        themeContext.APIURL,
        themeContext.token,
        themeContext.employeeBusiness
    ]);
    /*
     * Si todavía no encontramos el negocio,
     * evitamos que el componente intente acceder
     * a business.Products.
     */
    if (loadingBusiness) {
        return (
            <>
                <NavBar />

                <div className="new-sales-container">
                    <p>Cargando negocio...</p>
                </div>
            </>
        );
    }

    if (!business) {
        return (
            <>
                <NavBar />

                <div className="new-sales-container">
                    <p>No se encontró el negocio.</p>
                </div>
            </>
        );
    }


    /*
     * Lista de nombres de productos.
     */
    const products = business.Products.map(
        product => product.name
    );


    /*
     * Busca un producto cuyo nombre comience
     * con el texto introducido.
     */
    function suggestProduct(input, productList) {

        const suggestion = productList.find(product =>
            product
                .toLowerCase()
                .startsWith(input.toLowerCase())
        );

        return suggestion || null;
    }


    /*
     * Determina si una tecla representa texto
     * que debería modificar el input.
     */
    function isTextKey(key) {

        const ignoredKeys = [
            'Enter',
            'Tab',
            'Alt',
            'Control',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp',
            'Shift',
            'CapsLock',
            'Meta',
            'Escape',
            'Home',
            'End',
            'PageUp',
            'PageDown',
            'Insert',
            'ContextMenu',
            'NumLock',
            'ScrollLock'
        ];

        return !ignoredKeys.includes(key);
    }


    /*
     * Autocompletado del nombre del producto.
     */
    function handleKeyPress(e) {

        const input = e.target;

        /*
         * Usamos propiedades del propio input
         * para saber qué parte fue escrita por el usuario.
         */
        if (input.dataset.userLength === undefined) {
            input.dataset.userLength = '0';
        }

        let userLength = Number(input.dataset.userLength);

        /*
         * TAB -> completar producto.
         */
        if (e.key === 'Tab') {

            e.preventDefault();

            const suggestion = suggestProduct(
                input.value,
                products
            );

            if (suggestion) {

                input.value = suggestion;

                input.dataset.suggestionLength = String(
                    suggestion.length
                );

                input.dataset.userLength = String(
                    suggestion.length
                );

                input.selectionStart = suggestion.length;
                input.selectionEnd = suggestion.length;
            }

            return;
        }


        /*
         * Teclas normales.
         */
        if (isTextKey(e.key)) {

            if (e.key !== 'Backspace' && e.key !== 'Delete') {

                userLength++;

            } else if (e.key === 'Backspace' && userLength > 0) {

                userLength--;
            }
        }


        input.dataset.userLength = String(userLength);
    }


    /*
     * Después de escribir, mostrar la sugerencia
     * del producto.
     */
    function handleKeyRelease(e) {

        const input = e.target;

        const userLength = Number(
            input.dataset.userLength || 0
        );

        if (
            isTextKey(e.key) &&
            e.key !== 'Backspace' &&
            e.key !== 'Delete'
        ) {

            const suggestion = suggestProduct(
                input.value,
                products
            );

            if (suggestion) {

                input.value = suggestion;

                input.dataset.suggestionLength = String(
                    suggestion.length
                );
            }
        }


        /*
         * Permitir navegar hacia atrás dentro
         * de la parte escrita por el usuario.
         */
        if (
            e.key === 'ArrowLeft' &&
            input.selectionStart < userLength
        ) {

            input.dataset.userLength = String(
                input.selectionStart
            );
        }


        /*
         * Seleccionar la parte autocompletada.
         */
        if (e.key !== 'Tab') {

            const currentUserLength = Number(
                input.dataset.userLength || 0
            );

            const currentSuggestionLength = Number(
                input.dataset.suggestionLength || 0
            );

            if (
                currentUserLength < currentSuggestionLength
            ) {

                input.setSelectionRange(
                    currentUserLength,
                    currentSuggestionLength,
                    'backward'
                );
            }
        }
    }


    /*
     * Volver a la página anterior.
     */
    function handleGoBackClick() {
        window.history.back();
    }


    /*
     * Agregar un producto a la venta.
     */
    function handleAddSaleItem() {

        const nameInput = document.getElementById(
            `${props.bName}-input-1`
        );

        const quantityInput = document.getElementById(
            `${props.bName}-input-2`
        );

        const priceInput = document.getElementById(
            `${props.bName}-input-3`
        );


        const name = nameInput.value.trim();

        const quantity = Number(
            quantityInput.value
        );

        const price = Number(
            priceInput.value
        );


        /*
         * Validar campos.
         */
        if (
            name === '' ||
            !Number.isInteger(quantity) ||
            quantity <= 0 ||
            !Number.isFinite(price) ||
            price <= 0
        ) {

            document
                .querySelector(
                    'p.must-have-all-fields-filled-paragraph'
                )
                .style.display = 'block';

            return;
        }


        /*
         * Buscar el producto real.
         */
        const product = business.Products.find(
            product => product.name === name
        );


        /*
         * El producto no existe.
         */
        if (!product) {

            document
                .getElementById('product-does-not-exist')
                .style.display = 'block';

            return;
        }


        /*
         * Ocultar errores anteriores.
         */
        document
            .querySelector(
                'p.must-have-all-fields-filled-paragraph'
            )
            .style.display = 'none';

        document
            .querySelector(
                'p.duplicate-product-error'
            )
            .style.display = 'none';

        document
            .getElementById('product-does-not-exist')
            .style.display = 'none';


        /*
         * Buscar si el producto ya fue agregado.
         */
        const existingItem = saleItems.find(
            item => item.productId === product.id
        );


        if (existingItem) {

            /*
             * No permitimos agregar el mismo producto
             * con otro precio.
             */
            if (existingItem.price !== price) {

                document
                    .querySelector(
                        'p.duplicate-product-error'
                    )
                    .style.display = 'block';

                return;
            }


            /*
             * Si el precio es el mismo,
             * simplemente sumamos la cantidad.
             */
            setSaleItems(prevItems =>
                prevItems.map(item =>
                    item.productId === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity
                        }
                        : item
                )
            );

            return;
        }


        /*
         * Máximo 12 productos distintos.
         */
        if (saleItems.length >= 12) {

            document
                .querySelector(
                    'p.cannot-add-more-items-paragraph'
                )
                .style.display = 'block';

            return;
        }


        /*
         * Agregar nuevo producto.
         */
        setSaleItems(prevItems => [
            ...prevItems,
            {
                productId: product.id,
                name: product.name,
                quantity,
                price
            }
        ]);
    }


    /*
     * Sugerir cantidad 1.
     */
    function suggestQuantity() {

        const input = document.getElementById(
            `${props.bName}-input-2`
        );

        input.value = '1';

        input.setSelectionRange(
            0,
            1,
            'backward'
        );
    }


    /*
     * Sugerir automáticamente el precio
     * del producto seleccionado.
     */
    function suggestPrice() {

        const nameInput = document.getElementById(
            `${props.bName}-input-1`
        );

        const priceInput = document.getElementById(
            `${props.bName}-input-3`
        );


        const product = business.Products.find(
            product => product.name === nameInput.value
        );


        if (!product) {
            return;
        }


        priceInput.value =
            product.business_product.price;

        priceInput.setSelectionRange(
            0,
            priceInput.value.length,
            'backward'
        );
    }


    /*
     * Crear la venta.
     */
    async function handleNewSaleRequest() {

        /*
         * No permitir una venta sin productos.
         */
        if (saleItems.length === 0) {
            document
                .getElementById('sale-load-error')
                .style.display = 'block';

            return;
        }


        /*
         * Tipo de ticket.
         */
        const ticketTypeElement =
            document.getElementById('ticket-type');

        let ticketType;

        switch (ticketTypeElement.value) {

            case 'A':
                ticketType = 1;
                break;

            case 'B':
                ticketType = 6;
                break;

            case 'C':
                ticketType = 11;
                break;

            default:
                ticketType = 11;
        }


        try {

            /*
             * Crear venta.
             */
            const response = await fetch(
                themeContext.APIURL + 'user/business/newSale',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': themeContext.token
                    },

                    body: JSON.stringify({
                        saleItems,
                        ticketType,
                        bName: business.name,
                        total: saleItems.reduce(
                            (acc, item) =>
                                acc + item.quantity * item.price,
                            0
                        ),
                        time: Date.now()
                    }),

                    mode: 'cors'
                }
            );


            const data = await response.json();

            if (!data.ok) {

                document
                    .getElementById('sale-load-error')
                    .style.display = 'block';

                return;
            }


            /*
             * Limpiar los productos de la venta.
             */
            setSaleItems([]);


            /*
             * Obtener los negocios actualizados.
             */
            const reloadResponse = await fetch(
                themeContext.APIURL + 'user/pageReload',
                {
                    method: 'GET',

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': themeContext.token
                    }
                }
            );


            const reloadData =
                await reloadResponse.json();

            if (!reloadData.ok) {

                document
                    .getElementById('sale-load-error')
                    .style.display = 'block';

                return;
            }


            /*
             * Actualizar el contexto.
             */
            window.localStorage.setItem(
                'businesses',
                JSON.stringify(reloadData.data)
            );

            themeContext.setBusinesses(
                reloadData.data
            );

            window.localStorage.setItem('employeeBusiness', themeContext.employeeBusiness)


        } catch (error) {

            console.error(error);

            document
                .getElementById('sale-load-error')
                .style.display = 'block';
        }
    }


    return (
        <>
            <NavBar />

            <div className="new-sales-container">

                <div className="new-sales-window">

                    {/* Primera fila */}

                    <div className="add-sales-first-row">

                        <div className="go-back-button-container">

                            <button
                                onClick={handleGoBackClick}
                                className="go-back-button"
                            >
                                &lt;
                            </button>

                        </div>


                        <h3 className="new-sale-add-item-title">
                            Agregar venta
                        </h3>


                        <div className="ticket-type-selector-container">

                            <label className="ticket-type-label">
                                factura tipo:
                            </label>

                            <select
                                id="ticket-type"
                                className="ticket-type-select"
                                defaultValue="C"
                            >
                                <option value="C">C</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                            </select>

                        </div>

                    </div>


                    {/* Segunda fila */}

                    <div className="new-sale-second-row">

                        <div className="new-sale-add-item-inputs-container">

                            <label>
                                producto:
                            </label>

                            <input
                                id={`${props.bName}-input-1`}
                                autoComplete="off"
                                placeholder={
                                    products.length > 0
                                        ? products[0]
                                        : 'tomate'
                                }
                                onKeyDown={handleKeyPress}
                                onKeyUp={handleKeyRelease}
                                name="name"
                                type="text"
                                className="add-sale-item-input"
                            />


                            <label>
                                cantidad:
                            </label>

                            <input
                                id={`${props.bName}-input-2`}
                                name="quantity"
                                type="text"
                                placeholder="1"
                                onFocus={suggestQuantity}
                                className="add-sale-item-input"
                            />


                            <label>
                                precio unitario:
                            </label>

                            <input
                                id={`${props.bName}-input-3`}
                                onFocus={suggestPrice}
                                name="value"
                                placeholder={
                                    business.Products.length > 0
                                        ? business.Products[0]
                                            .business_product.price
                                        : 1200
                                }
                                type="text"
                                className="add-sale-item-input"
                            />


                            <button
                                className="add-sale-item-button"
                                onClick={handleAddSaleItem}
                            >
                                agregar
                            </button>

                        </div>


                        <p className="must-have-all-fields-filled-paragraph">
                            debe llenar todos los campos
                        </p>


                        <p className="cannot-add-more-items-paragraph">
                            no se pueden agregar más items
                        </p>


                        <p className="duplicate-product-error">
                            no se puede cambiar el valor del producto una vez haya sido cargado
                        </p>


                        <NewSale data={saleItems} />


                        <button onClick={handleNewSaleRequest}>
                            subir
                        </button>


                        <p
                            id="sale-load-error"
                            className="sale-load-error-p"
                        >
                            error al cargar venta
                        </p>


                        <p
                            id="product-does-not-exist"
                            className="sale-load-waring-p"
                        >
                            debe agregar los productos antes de cargar una venta
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}