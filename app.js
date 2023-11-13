const { createApp, ref } = Vue;

const app = createApp({
    data() {
        return {
            username: null,
            email: null,
            role: 0,
            roles: [{value: 2, name: 'Test'}],
            password: null,
            password_repeat: null,
            password_fields: { showPassword: false, showPasswordRepeat: false },
            public: false,
            agree: true,
            errors: {}
        }
    },
    computed: {
        checkEmail() {
            return this.validateEmail();
        },
        checkPassword() {
            return this.comparePasswords();
        }
    },
    methods: {
        submitForm() {
            this.errors = {};
            const fields = ['username','email','role','password'];
            const _this = this;


            fields.forEach(function(field) {
                console.log(field);
                _this.formValidation(field);
            });

            if( this.email && !this.validateEmail() ) {
                this.errors.email = 'Email must be correct format ';
            }

            if( this.password && !this.comparePasswords() ) {
                this.errors.password_repeat = 'Passwords do not match ';
            }

            if( this.agree && Object.keys(this.errors).length === 0 ) {
                let data = new FormData();
                data.append('username', this.username);
                data.append('email', this.email);
                data.append('role', this.role);
                data.append('password', this.password);
                data.append('public', this.public);
                this.sendRequest( '/', data );
            }
        },
        sendRequest( url, data ) {
            axios.post(url, data)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        },
        formValidation( field ) {
            if( !this[field] ) {
                this.errors[field] = field.charAt(0).toUpperCase() + field.slice(1) + ' is required ! ';
            }
        },
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
            if (!emailRegex.test(this.email)) {
              return false;
            } else {
              return true;
            }
        },
        comparePasswords() {
            if( this.password === this.password_repeat ) {
                return true;
            } else {
                return false;
            }
        },
        passwordVisible( key ) {
            this.password_fields[key] = !this.password_fields[key];
        }
    }
});

app.mount('#app');
