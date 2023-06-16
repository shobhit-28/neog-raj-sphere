import { CirclesWithBar} from 'react-loader-spinner';
import './loader.css';
export const Loader = () => {
    return (
        <div className='loader'>
            <CirclesWithBar
                color={'#27374D'}
                className='loading'
                height="150"
                width="150"
                radius="20" />
        </div>
    );
};