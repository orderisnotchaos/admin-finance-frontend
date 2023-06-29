import './DetailsCard.css';

export default function DetailsCard(props){

    let password = '';
    for(let i=0;i<props.data[2].length;i++){
        password+='*';
    }
    const labels = ['nombre de usuario', 'mail', 'contraseña', 'tipo y número de documento','negocios','teléfono'];
    return(
        <div className='container'>

                {labels.map((label,i) =>{
                                let paragraph = <p className='details-card-p'><strong>{props.data[i]}</strong></p>;

                                if(label === 'contraseña') paragraph = <p className='details-card-p'><strong>{password}</strong></p>;
                                if(label === 'tipo y número de documento') paragraph = <p className='details-card-p'><strong>{props.data[i][0]} {props.data[i][1]}</strong></p>

                                return(
                                <div className='details-card-field'>
                                    <label className='details-card-label'>{label}:</label>
                                    {paragraph}
                                </div>
                                );
                })}
        </div>
    );
}