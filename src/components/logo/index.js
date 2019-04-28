import './index.less';
import logoUrl from './../../assets/a.jpg';

export default function(props){
    return(
        <div className='logo-wrapper'>
            <img src={logoUrl} alt=''/>
        </div>
    )
}