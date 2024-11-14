import NftListArea from "@components/nft-list";
import NftsBanner from "@components/nfts";
import productData from "../../data/products.json";

const NftsArea = () => (
    <div className="nfts-area">
        <NftsBanner />
        <NftListArea
            data={{
                section_title: {
                    title: "Explore Product",
                },
                products: productData,
            }}
        />
    </div>
);

export default NftsArea;
