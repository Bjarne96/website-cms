export let divstyle = {
    width: window.innerWidth,
    height: window.innerHeight - 56
}
export const innerHeight1of5 = window.innerHeight / 5;
export const innerHeight3of5 = (window.innerHeight / 5) * 3;

export let sidebarNavStyle = {
    top: innerHeight1of5,
    height: innerHeight3of5,
}

export const itemMargin = 5;

//3 items
export let sidebarNavItemStyle = {
    height: (innerHeight3of5 - (itemMargin * 4)) / 3,
    marginTop: itemMargin,
    marginBottom: itemMargin
}