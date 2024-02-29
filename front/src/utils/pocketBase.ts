import PocketBase, { type RecordModel } from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export interface Taxon extends RecordModel {
    scientific: string;
    vernacular: string | undefined;
    rank: string;
    site_link: string;
    image_link: string;
    parent: string | undefined;
}

export default pb;
