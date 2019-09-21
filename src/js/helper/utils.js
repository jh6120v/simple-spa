const htmlToCanvas = (elem, fileNamePrefix = 'download') => {
    import('html2canvas').then((html2canvas) => {
        document.querySelector('#convert').addEventListener('click', () => {
            html2canvas.default(elem).then((canvas) => {
                const downloadElement = document.createElement('a');
                const fileName = new Date().toLocaleString().replace(' ', '_');

                downloadElement.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
                downloadElement.download = `${fileNamePrefix}_${fileName}.jpg`;
                downloadElement.click();
            });
        }, false);
    });
};

const inputTowWayBinding = (targetElem, customSetBehavior, initText = '可以輸入文字喔！') => {
    const newObj = new Proxy(
        {
            output: initText
        },
        {
            get(target, key) {
                return target[key];
            },
            set(target, key, value) {
                // default behavior
                target[key] = value;

                // custom behavior
                customSetBehavior(value);

                return true;
            }
        }
    );

    customSetBehavior(newObj.output);

    targetElem.value = initText;
    targetElem.addEventListener('input', (e) => {
        newObj.output = e.target.value;
    });
};

export {
    htmlToCanvas,
    inputTowWayBinding
};
