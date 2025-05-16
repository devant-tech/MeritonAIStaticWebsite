export const stringToColor = (str: string) => {
    let hash = 0;
    let i;

     
    for (i = 0; i < str.length; i += 1) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
     

    return color;
};

const getBrightness = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    // Brightness formula
    return (r * 299 + g * 587 + b * 114) / 1000;
};

export const stringAvatar = (name: string) => {
    const backgroundColor = stringToColor(name);

    const textColor =
        getBrightness(backgroundColor) < 128 ? '#FFFFFF' : '#000000'; // Determine contrasting text color

    return {
        sx: {
            bgcolor: backgroundColor,
            color: textColor
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
};
