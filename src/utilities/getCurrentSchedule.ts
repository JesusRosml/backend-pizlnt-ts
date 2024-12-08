export const getCurrentSchedule = ( date: Date ): string => {
    const months: string[] = [ 
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' 
    ];

    return `${ date.getDate() } ${ months[ date.getMonth() ] } ${ date.getFullYear() }`;
}