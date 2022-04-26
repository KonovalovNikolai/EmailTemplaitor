import { Descendant } from "slate";
import { serializeNode } from "../utils/serialize";

type SerializedDocumentProps = {
    nodes: Descendant[];
};

export const SerializedDocument = ({ nodes }: SerializedDocumentProps) => {
    return (
        <div>
            {nodes.map(n => serializeNode(n))}
        </div>
    );
};