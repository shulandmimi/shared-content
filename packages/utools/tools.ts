export function InitPlugin(plugins: any) {
    const modules = {};
    if (Array.isArray(plugins)) {
        // @ts-ignore
        plugins.forEach(item => (modules[item.code] = item));
    } else {
        plugins[plugins.code] = plugins;
    }

    // @ts-ignore
    window.exports = plugins;
}
