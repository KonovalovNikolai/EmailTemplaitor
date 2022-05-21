import { Descendant } from "slate";
import { Addressee } from "../utils/Addressee";
import { serializeNode } from "../utils/serialize";

type SerializedDocumentProps = {
    nodes: Descendant[];
    addressee: Addressee;
};

export const SerializedDocument = ({ nodes, addressee }: SerializedDocumentProps) => {
    return (
        <>
            {nodes.map(n => serializeNode(n, addressee))}
        </>
    );
};