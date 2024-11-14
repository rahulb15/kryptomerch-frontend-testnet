import { MutatingDots } from "react-loader-spinner";

const Loader = () => (
    <div className="overlay">
        <div className="loading">
            <MutatingDots color="#fff" />
        </div>
    </div>
);

export default Loader;
