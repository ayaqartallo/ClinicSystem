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
    
    // التحقق من صحة نموذج تسجيل الدخول
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();
        
        if (username === '' || password === '') {
            alert('الرجاء إدخال اسم المستخدم وكلمة المرور');
            return;
        }
        
        // هنا يمكنك إضافة كود AJAX لإرسال البيانات إلى الخادم
        console.log('تم إرسال بيانات تسجيل الدخول:', {
            username: username,
            password: password,
            rememberMe: $('#rememberMe').is(':checked')
        });
        
        // عرض رسالة نجاح (في الواقع، يجب توجيه المستخدم إلى لوحة التحكم)
        alert('تم تسجيل الدخول بنجاح! سيتم توجيهك إلى لوحة التحكم.');
        
        // توجيه المستخدم إلى صفحة أخرى (لوحة التحكم)
        // window.location.href = 'dashboard.html';
    });
    
    // تأثيرات عند التركيز على حقول الإدخال
    $('.form-control').focus(function() {
        $(this).parent().find('.input-group-text').css('color', '#3498db');
    }).blur(function() {
        $(this).parent().find('.input-group-text').css('color', '#495057');
    });
    
    // تبديل اللغة بين العربية والإنجليزية
    $('#switchLanguage').click(function() {
        const isArabic = $('html').attr('lang') === 'ar';
        
        if (isArabic) {
            // التبديل إلى الإنجليزية
            $('html').attr('lang', 'en').attr('dir', 'ltr');
            $('#switchLanguage').html('<i class="fas fa-language me-1"></i> العربية');
            
            // تغيير النصوص إلى الإنجليزية
            $('title').text('Clinic Management System - Login');
            $('.login-header h3').html('<i class="fas fa-hospital me-2"></i> Clinic Management System');
            $('#username').attr('placeholder', 'Username');
            $('#password').attr('placeholder', 'Password');
            $('.form-check-label').text('Remember me');
            $('.btn-login').html('<i class="fas fa-sign-in-alt me-2"></i> Login');
            $('.forgot-password').text('Forgot password?');
            $('.login-footer p:first').html('Don\'t have an account? <a href="#" style="color: var(--secondary-color);">Contact Admin</a>');
        } else {
            // التبديل إلى العربية
            $('html').attr('lang', 'ar').attr('dir', 'rtl');
            $('#switchLanguage').html('<i class="fas fa-language me-1"></i> English');
            
            // تغيير النصوص إلى العربية
            $('title').text('نظام إدارة العيادات - تسجيل الدخول');
            $('.login-header h3').html('<i class="fas fa-hospital me-2"></i> نظام إدارة العيادات');
            $('#username').attr('placeholder', 'اسم المستخدم');
            $('#password').attr('placeholder', 'كلمة المرور');
            $('.form-check-label').text('تذكرني');
            $('.btn-login').html('<i class="fas fa-sign-in-alt me-2"></i> تسجيل الدخول');
            $('.forgot-password').text('نسيت كلمة المرور؟');
            $('.login-footer p:first').html('ليس لديك حساب؟ <a href="#" style="color: var(--secondary-color);">اتصل بمدير النظام</a>');
        }
    });
});