import { changeTheme } from "@utils/layout.utils";

export const initHeader = () => {
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            changeTheme();
        })
    })
}