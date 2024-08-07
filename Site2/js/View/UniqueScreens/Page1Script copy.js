class Page1Scripts {
    static onEnter() {
        console.log("1 Enter");
    }
}
Page1Scripts.onLeave = () => {
    console.log("1 Leave");
};
Page1Scripts.onEntering = () => { };
Page1Scripts.onLeaving = () => { };
export default Page1Scripts;
