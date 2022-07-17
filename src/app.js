import Alpine from 'alpinejs'

Alpine.store('passwordValidation', {
    rules: {
        strength: {
            message: 'Password strength: weak',
            strong: false,
            validated: false
        },
        match: {
            'message': 'Passwords must match.',
            'validated': false
        },
        length: {
            'message': 'Needs at least eight characters.',
            'validated': false
        },
        alpha: {
            'message': 'At least one uppercase and one lowercase letter.',
            'validated': false
        },
        symbol: {
            'message': 'At least one special character.',
            'validated': false
        },
        numeric: {
            'message': 'At least one number.',
            'validated': false
        },
    },

    inputValidations(passwordRules) {
        let validationStatus = [];
        const excludeKeys = ['strength', 'others'];

        Object.entries(passwordRules).map(([key, value]) => {
            if (!excludeKeys.includes(key)) {
                validationStatus.push(value.validated);
            }
        });

        return validationStatus.every(status => status);
    },

    validate(password, password_confirmation = null, passwordRules) {
        let isBlank, isMatch;

        if (password_confirmation == null) {
            isBlank = /^\s*$/.test(password);
            isMatch = !isBlank && password;
        } else {
            isBlank = /^\s*$/.test(password) || /^\s*$/.test(password_confirmation);
            isMatch = !isBlank && (password === password_confirmation);
        }

        passwordRules['match']['validated'] = isMatch;
        passwordRules['length']['validated'] = /.{8,}/.test(password);
        passwordRules['alpha']['validated'] = /[a-z].*[A-Z]|[A-Z].*[a-z]/.test(password);
        passwordRules['symbol']['validated'] = /[^a-zA-Z0-9]/.test(password);
        passwordRules['numeric']['validated'] = /\d/.test(password);

        return {
            strength: {
                message: this.inputValidations(passwordRules) ? 'Password strength: strong' : 'Password strength: weak',
                strong: this.inputValidations(passwordRules),
                validated: this.inputValidations(passwordRules),
            },
            rules: passwordRules,
        };
    },
})

window.Alpine = Alpine

Alpine.start()