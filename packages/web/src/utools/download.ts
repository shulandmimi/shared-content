export async function download(url: string, name: string) {
    const response = await fetch(url);

    const blob = await response.blob();

    const urldata = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = urldata;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(urldata);
}
