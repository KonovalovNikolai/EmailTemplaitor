import { Variable } from "./Variable"


const RenderElement = ({ attributes, children, element }: any) => {

    const style = { textAlign: element.align }
    switch (element.type) {
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            )
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            )
        case 'variable':
            return (
                <Variable {...{ attributes, children, element }} /> 
            )
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            )
    }
}

export default RenderElement;