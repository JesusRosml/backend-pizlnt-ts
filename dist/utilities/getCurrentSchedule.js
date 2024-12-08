"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentSchedule = void 0;
const getCurrentSchedule = (date) => {
    const months = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};
exports.getCurrentSchedule = getCurrentSchedule;
//# sourceMappingURL=getCurrentSchedule.js.map