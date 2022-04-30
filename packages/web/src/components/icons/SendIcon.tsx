import { IconOption } from './interface';

export default function SendIcon(props: IconOption) {
    return (
        <svg
            onClick={props.onClick}
            // @ts-ignore
            t="1651302183530"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3034"
            data-darkreader-inline-fill=""
            width={props.width || '20px'}
            height={props.height || '20px'}>
            <path
                d="M925.6 559.2L152 145.6c-11.2-5.6-24.8 3.2-23.2 15.2l60 714.4c0.8 11.2 12 17.6 22.4 13.6L460.8 784l136.8 155.2c8.8 9.6 24 5.6 27.2-6.4l65.6-245.6L925.6 588c11.2-5.6 12-22.4 0-28.8z m-328 305.6l-72-128-368-568 488 504-48 192z"
                p-id="3035"></path>
        </svg>
    );
}