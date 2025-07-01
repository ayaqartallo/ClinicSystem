$(document).ready(function() {
    // تبديل عرض كلمة المرور
    $('#togglePassword').click(function() {
        const password = $('#password');
        const icon = $(this).find('i');
        
        if (password.attr('type') === 'password') {
            password.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            password.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
    
    // تبديل نوع المستخدم
    $('.user-type-btn').click(function() {
        $('.user-type-btn').removeClass('active');
        $(this).addClass('active');
        
        const userType = $(this).data('user-type');
        $('#userType').val(userType);
        
        // إخفاء جميع الحقول أولاً
        $('#patientFields, #staffFields, #adminFields').addClass('hidden-field');
        
        // إظهار الحقول المناسبة حسب نوع المستخدم
        if (userType === 'patient') {
            $('#patientFields').removeClass('hidden-field');
        } else if (userType === 'staff') {
            $('#staffFields').removeClass('hidden-field');
        } else if (userType === 'admin') {
            $('#adminFields').removeClass('hidden-field');
        }
    });
    
    // التحقق من صحة نموذج التسجيل
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        
        // التحقق من تطابق كلمة المرور
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        
        if (password !== confirmPassword) {
            alert('كلمة المرور وتأكيدها غير متطابقين');
            return;
        }
        
        if (!$('#agreeTerms').is(':checked')) {
            alert('يجب الموافقة على الشروط والأحكام');
            return;
        }
        
        // جمع بيانات النموذج
        const formData = {
            username: $('#username').val(),
            email: $('#email').val(),
            password: password,
            user_type: $('#userType').val()
        };
        
        // إضافة الحقول الإضافية حسب نوع المستخدم
        const userType = formData.user_type;
        
        if (userType === 'patient') {
            formData.patient = {
                national_id: $('#national_id').val(),
                full_name: $('#full_name').val(),
                birth_date: $('#birth_date').val(),
                gender: $('#gender').val(),
                phone: $('#phone').val(),
                address: $('#address').val(),
                blood_type: $('#blood_type').val()
            };
        } else if (userType === 'staff') {
            formData.staff = {
                national_id: $('#staff_national_id').val(),
                full_name: $('#staff_full_name').val(),
                department_id: $('#department_id').val(),
                position: $('#position').val(),
                phone: $('#staff_phone').val(),
                specialization: $('#specialization').val()
            };
        } else if (userType === 'admin') {
            formData.admin = {
                national_id: $('#admin_national_id').val(),
                full_name: $('#admin_full_name').val(),
                position: $('#admin_position').val(),
                department_id: $('#admin_department_id').val(),
                phone: $('#admin_phone').val()
            };
        }
        
        // هنا يمكنك إضافة كود AJAX لإرسال البيانات إلى الخادم
        console.log('بيانات التسجيل:', formData);
        
        // محاكاة إرسال البيانات إلى الخادم
        $.ajax({
            url: '/api/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                alert('تم إنشاء الحساب بنجاح! سيتم توجيهك إلى صفحة تسجيل الدخول.');
                window.location.href = 'login.html';
            },
            error: function(xhr, status, error) {
                alert('حدث خطأ أثناء إنشاء الحساب: ' + xhr.responseJSON.message);
            }
        });
    });
    
    // تبديل اللغة بين العربية والإنجليزية
    $('#switchLanguage').click(function() {
        const isArabic = $('html').attr('lang') === 'ar';
        
        if (isArabic) {
            // التبديل إلى الإنجليزية
            $('html').attr('lang', 'en').attr('dir', 'ltr');
            $('#switchLanguage').html('<i class="fas fa-language me-1"></i> العربية');
            
            // تغيير النصوص إلى الإنجليزية
            $('title').text('Clinic Management System - Register');
            $('.login-header h3').html('<i class="fas fa-user-plus me-2"></i> Create New Account');
            $('#username').attr('placeholder', 'Username');
            $('#email').attr('placeholder', 'Email');
            $('#password').attr('placeholder', 'Password');
            $('#confirmPassword').attr('placeholder', 'Confirm Password');
            $('.form-check-label').text('I agree to the terms and conditions');
            $('.btn-login').html('<i class="fas fa-user-plus me-2"></i> Register');
            $('.text-center p').html('Already have an account? <a href="login.html" style="color: var(--secondary-color);">Login now</a>');
            
            // تغيير نصوص حقول المريض
            if ($('#patientFields').is(':visible')) {
                $('#national_id').attr('placeholder', 'National ID');
                $('#full_name').attr('placeholder', 'Full Name');
                $('#phone').attr('placeholder', 'Phone Number');
                $('#address').attr('placeholder', 'Address');
            }
            
            // تغيير نصوص حقول الطبيب
            if ($('#staffFields').is(':visible')) {
                $('#staff_national_id').attr('placeholder', 'National ID');
                $('#staff_full_name').attr('placeholder', 'Full Name');
                $('#position').attr('placeholder', 'Position');
                $('#staff_phone').attr('placeholder', 'Phone Number');
                $('#specialization').attr('placeholder', 'Specialization');
            }
            
            // تغيير نصوص حقول الموظف الإداري
            if ($('#adminFields').is(':visible')) {
                $('#admin_national_id').attr('placeholder', 'National ID');
                $('#admin_full_name').attr('placeholder', 'Full Name');
                $('#admin_position').attr('placeholder', 'Position');
                $('#admin_phone').attr('placeholder', 'Phone Number');
            }
        } else {
            // التبديل إلى العربية
            $('html').attr('lang', 'ar').attr('dir', 'rtl');
            $('#switchLanguage').html('<i class="fas fa-language me-1"></i> English');
            
            // تغيير النصوص إلى العربية
            $('title').text('نظام إدارة العيادات - تسجيل مستخدم جديد');
            $('.login-header h3').html('<i class="fas fa-user-plus me-2"></i> تسجيل مستخدم جديد');
            $('#username').attr('placeholder', 'اسم المستخدم');
            $('#email').attr('placeholder', 'البريد الإلكتروني');
            $('#password').attr('placeholder', 'كلمة المرور');
            $('#confirmPassword').attr('placeholder', 'تأكيد كلمة المرور');
            $('.form-check-label').text('أوافق على الشروط والأحكام');
            $('.btn-login').html('<i class="fas fa-user-plus me-2"></i> إنشاء الحساب');
            $('.text-center p').html('لديك حساب بالفعل؟ <a href="login.html" style="color: var(--secondary-color);">سجل الدخول الآن</a>');
            
            // تغيير نصوص حقول المريض
            if ($('#patientFields').is(':visible')) {
                $('#national_id').attr('placeholder', 'رقم الهوية');
                $('#full_name').attr('placeholder', 'الاسم الكامل');
                $('#phone').attr('placeholder', 'رقم الهاتف');
                $('#address').attr('placeholder', 'العنوان');
            }
            
            // تغيير نصوص حقول الطبيب
            if ($('#staffFields').is(':visible')) {
                $('#staff_national_id').attr('placeholder', 'رقم الهوية');
                $('#staff_full_name').attr('placeholder', 'الاسم الكامل');
                $('#position').attr('placeholder', 'الوظيفة');
                $('#staff_phone').attr('placeholder', 'رقم الهاتف');
                $('#specialization').attr('placeholder', 'التخصص');
            }
            
            // تغيير نصوص حقول الموظف الإداري
            if ($('#adminFields').is(':visible')) {
                $('#admin_national_id').attr('placeholder', 'رقم الهوية');
                $('#admin_full_name').attr('placeholder', 'الاسم الكامل');
                $('#admin_position').attr('placeholder', 'الوظيفة');
                $('#admin_phone').attr('placeholder', 'رقم الهاتف');
            }
        }
    });
});