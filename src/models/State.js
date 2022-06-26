
export const stateInitial = {
    total: 0,
    config: false,
    selected: 'L1C1',
    operator: '+',
    rows: {
        row1: { active: true, 
            col1: { id: 'L1C1', name: null, active: true,  value: 0, maximum: 999 },
            col2: { id: 'L1C2', name: null, active: false, value: 0, maximum: 999 },
            col3: { id: 'L1C3', name: null, active: false, value: 0, maximum: 999 },
        },
        row2: { active: false, 
            col1: { id: 'L2C1', name: null, active: false, value: 0, maximum: 999 },
            col2: { id: 'L2C2', name: null, active: false, value: 0, maximum: 999 },
            col3: { id: 'L2C3', name: null, active: false, value: 0, maximum: 999 },
        },
        row3: { active: false, 
            col1: { id: 'L3C1', name: null, active: false, value: 0, maximum: 999 },
            col2: { id: 'L3C2', name: null, active: false, value: 0, maximum: 999 },
            col3: { id: 'L3C3', name: null, active: false, value: 0, maximum: 999 },
        },
    },
};

