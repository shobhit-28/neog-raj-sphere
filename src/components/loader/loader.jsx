import { CirclesWithBar} from 'react-loader-spinner';
import './loader.css';
export const Loader = () => {
    return (
        <div className='loader'>
            <CirclesWithBar
                color={'#27374D'}
                className='loading'
                height="200"
                width="200"
                radius="20" />
        </div>
    );
};