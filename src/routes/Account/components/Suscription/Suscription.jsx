
import './Suscription.css';
export default function Suscription(props){

        return (
            <>
                {props.sub > 0 ? <label className='active-sub-label'>activa</label>:<label className='inactive-sub-label'>inactiva</label>}
                <div className='cancel-sub-div'>
                    <p className = 'cancel-sub-p'>quedan {props.sub} dias</p>
                </div>
            </>
        );
}