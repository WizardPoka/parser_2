export default function Button({children}) {
    function handleClick() {
        console.log("gg")
    }
    return (
        <button className="button" onClick={handleClick}>
            {children}
        </button>
    )
}
// children передается из <Button> text </Button> в этот файл