const rgbToRgba = (hex: any, opacity: any) => {
    const rgb = hex.split('(')[1].split(')')[0].split(',')
    return 'rgba(' + rgb[0].trim() + ',' + rgb[1].trim() + ',' + rgb[2].trim() + ',' + opacity + ')'
}

const hexToRgba = (hex: any, opacity: any) => {
    return hex && hex.replace(/\s+/g, '').length === 7
        ? 'rgba(' +
              parseInt('0x' + hex.slice(1, 3)) +
              ',' +
              parseInt('0x' + hex.slice(3, 5)) +
              ',' +
              parseInt('0x' + hex.slice(5, 7)) +
              ',' +
              opacity +
              ')'
        : ''
}

export { rgbToRgba, hexToRgba }
