import HashLoader from "react-spinners/HashLoader";

export const Loading = (isloading) => {
    console.log('isloading', isloading)
    const cssStyle = {
        position: "fixed",
        zIndex: "10",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.4)",
    };
    return (
        <div style={cssStyle}>
            <HashLoader color="#fff" loading={isloading} size={50} />
        </div>
    )
}

