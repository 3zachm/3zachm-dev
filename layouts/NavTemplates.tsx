interface NavTemplate {
        label: string;
        href: string;
}
const homeMain: NavTemplate[] = [
    // { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Social', href: '/social' },
    { label: 'Misc', href: '/misc' },
    { label: 'Patchouli?', href: '#' },
]
const yepMain: NavTemplate[] = [
    { label: 'Home', href: '/' },
    { label: 'Patchouli?', href: '#' },
]

export {
    type NavTemplate,
    homeMain,
    yepMain,
}