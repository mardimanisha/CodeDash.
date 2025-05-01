import { Button } from "../ui/button";

const options = ['text', 'url', 'image', 'pdf', 'email'] as const;

type Props = {
    selectedType: string;
    setSelectedType: (val: typeof options[number]) => void;
}

export default function QRContentTypeSelector({selectedType, setSelectedType}: Props) {
    return (
        <div className="flex flex-wrap gap-3">
            {options.map((type) => (
                <span key={type}>
                    <Button
                    variant={selectedType === type ? 'default' : 'outline'}
                    onClick={() => setSelectedType(type)}
                    className="cursor-pointer rounded-4xl "
                >
                    {type.toUpperCase()}
                </Button>
                </span>
                
            ))}
        </div>
    )
}
