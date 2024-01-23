import {FC} from "react";

interface TitleFormsProps {
    title: string,
    subtitle: string
}

const TitleForms: FC<TitleFormsProps> = ({title, subtitle}) => {
    return (
        <>
            <div className={"text-lg font-semibold"}>
                {title}
            </div>
            <div className={"text-gray-400"}>
                {subtitle}
            </div>
        </>
    )

}

export default TitleForms