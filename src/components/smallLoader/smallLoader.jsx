import { CirclesWithBar} from 'react-loader-spinner';
import './smallLoader.css';
export const SmallLoader = () => {
    return (
        <div className='small-loader'>
            <CirclesWithBar
                color={'#27374D'}
                className='loading'
                height="50"
                width="50"
                radius="20" />
        </div>
    );
};