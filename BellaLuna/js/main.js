$(document).ready(function() {
    
    const menuMovil = $('.menu-movil');
    const nav = $('.nav');
    const header = $('.site-header');
    const acordeonItems = $('.acordeon-item');
    const filtroBtns = $('.filtro-btn');
    const productos = $('.producto');
    const verDetalleBtn = $('.ver-detalle');
    const modal = $('#modal');
    const cerrarModal = $('.cerrar');
    const comentarBtns = $('.comentar-btn');
    const modalComentario = $('#modal-comentario');
    const cerrarComentario = $('#modal-comentario .cerrar');
    const formContacto = $('#form-contacto');
    const mensajeEnviado = $('#mensaje-enviado');
    const cerrarMensaje = $('.cerrar-mensaje');
    const formComentario = $('#form-comentario');

    // Funcionalidad del menú móvil
    menuMovil.on('click', function() {
        nav.toggleClass('mostrar');
        $(this).toggleClass('activo');
        
        
        if ($(this).hasClass('activo')) {
            $(this).find('span:nth-child(1)').css({
                'transform': 'rotate(45deg) translate(5px, 5px)'
            });
            $(this).find('span:nth-child(2)').css({
                'opacity': '0'
            });
            $(this).find('span:nth-child(3)').css({
                'transform': 'rotate(-45deg) translate(7px, -6px)'
            });
        } else {
            $(this).find('span').css({
                'transform': 'none',
                'opacity': '1'
            });
        }
    });

   
    nav.find('a').on('click', function() {
        if (window.innerWidth <= 768) {
            nav.removeClass('mostrar');
            menuMovil.removeClass('activo');
            menuMovil.find('span').css({
                'transform': 'none',
                'opacity': '1'
            });
        }
    });

    // Cambiar apariencia del header al hacer scroll
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    });

    
    function animarElementos() {
        $('.imagen-fade, .texto-animado').each(function() {
            const posicionElemento = $(this).offset().top;
            const posicionScroll = $(window).scrollTop();
            const alturaVentana = $(window).height();
            
            if (posicionScroll + alturaVentana * 0.8 > posicionElemento) {
                $(this).css('opacity', '1');
                $(this).css('transform', 'translateY(0)');
            }
        });
    }
    
    $(window).on('scroll', animarElementos);
    animarElementos(); 

    // Funcionalidad de acordeón en preguntas frecuentes
    acordeonItems.on('click', function() {
        $(this).toggleClass('active');
        
        // Cambiar el ícono
        const icono = $(this).find('.icono');
        if ($(this).hasClass('active')) {
            icono.text('-');
        } else {
            icono.text('+');
        }
    });

    // Filtrar productos
    filtroBtns.on('click', function() {
        const categoria = $(this).data('categoria');
        
        
        filtroBtns.removeClass('active');
        $(this).addClass('active');
        
        
        if (categoria === 'todos') {
            productos.fadeIn(300);
        } else {
            productos.hide();
            $(`.producto[data-categoria="${categoria}"]`).fadeIn(300);
        }
    });

    // Datos de productos para el modal
    const productosData = [
        {
            id: 1,
            nombre: "Ramo de XV",
            descripcion: "Ramo de 15 rosas eternas personalizada para la quinceañera. Nuestras rosas eternas duran hasta 3 años sin perder su belleza y frescura. El ramo viene presentado en una elegante caja y puede personalizarse con los colores que prefieras.",
            precio: "80 soles",
            imagen: "images/anuncio1.jpg",
            categoria: "rosas"
        },
        {
            id: 2,
            nombre: "Ramo Unitario",
            descripcion: "Ramo de una sola rosa eterna personalizado. Ideal para ocasiones especiales como aniversarios o declaraciones de amor. La rosa viene presentada en un elegante empaque y puede personalizarse con un mensaje especial.",
            precio: "20 soles",
            imagen: "images/anuncio2.jpg",
            categoria: "rosas"
        },
        {
            id: 3,
            nombre: "Box Cumple",
            descripcion: "Box de cumpleaños, incluye peluche, varios dulces, una corona y mensaje personalizado. Perfecto para sorprender a esa persona especial en su día. Todo viene presentado en una hermosa caja decorativa que puede personalizarse según la ocasión.",
            precio: "100 soles",
            imagen: "images/anuncio3.jpg",
            categoria: "box"
        },
        {
            id: 4,
            nombre: "Box Cumple 2.0",
            descripcion: "Box de cumpleaños, varios chocolates y mensaje personalizado. Una versión más compacta pero igualmente especial de nuestro Box Cumple. Incluye una selección de chocolates premium y un mensaje personalizado escrito a mano.",
            precio: "50 soles",
            imagen: "images/anuncio4.jpg",
            categoria: "box"
        },
        {
            id: 5,
            nombre: "Pulseras para parejas",
            descripcion: "Pulseras con los nombres de la pareja. Un detalle especial para demostrar su conexión. Nuestras pulseras están hechas con materiales de alta calidad que garantizan durabilidad y comodidad para uso diario.",
            precio: "25 soles",
            imagen: "images/anuncio5.jpeg",
            categoria: "pulseras"
        },
        {
            id: 6,
            nombre: "Collares para parejas",
            descripcion: "Collares con la inicial de la pareja. Un símbolo elegante y discreto de su amor. Los collares están hechos con acero inoxidable de alta calidad, lo que garantiza que no se oxiden ni pierdan su brillo con el tiempo.",
            precio: "40 soles",
            imagen: "images/anuncio6.jpeg",
            categoria: "collares"
        }
    ];

    // Mostrar detalle de producto en modal
    verDetalleBtn.on('click', function(e) {
        e.preventDefault();
        const productoId = $(this).data('id');
        const producto = productosData.find(item => item.id === productoId);
        
        if (producto) {
            const detalleHTML = `
                <div class="producto-imagen">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="producto-info">
                    <h2>${producto.nombre}</h2>
                    <p>${producto.descripcion}</p>
                    <p class="precio">${producto.precio}</p>
                    <div class="acciones">
                        <a href="#" class="boton comprar-btn">Comprar Ahora</a>
                        <a href="#" class="boton-secundario agregar-carrito">Agregar al Carrito</a>
                    </div>
                </div>
            `;
            
            $('#producto-detalle').html(detalleHTML);
            modal.fadeIn(300);
            
            // Prevenir scroll del body
            $('body').css('overflow', 'hidden');
        }
    });

    
    cerrarModal.on('click', function() {
        modal.fadeOut(300);
        $('body').css('overflow', 'auto');
    });

    
    $(window).on('click', function(e) {
        if ($(e.target).is(modal)) {
            modal.fadeOut(300);
            $('body').css('overflow', 'auto');
        }
        if ($(e.target).is(modalComentario)) {
            modalComentario.fadeOut(300);
            $('body').css('overflow', 'auto');
        }
        if ($(e.target).is(mensajeEnviado)) {
            mensajeEnviado.fadeOut(300);
        }
    });

    
    comentarBtns.on('click', function(e) {
        e.preventDefault();
        const blogId = $(this).data('id');
        $('#blog-id').val(blogId);
        modalComentario.fadeIn(300);
        $('body').css('overflow', 'hidden');
    });

    
    cerrarComentario.on('click', function() {
        modalComentario.fadeOut(300);
        $('body').css('overflow', 'auto');
    });

    // Validación de formulario de contacto
    formContacto.on('submit', function(e) {
        e.preventDefault();
        
        let valido = true;
        
        
        const nombre = $('#nombre').val().trim();
        if (nombre === '') {
            $('#error-nombre').text('Por favor ingresa tu nombre');
            valido = false;
        } else {
            $('#error-nombre').text('');
        }
        
        
        const email = $('#email').val().trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            $('#error-email').text('Por favor ingresa tu email');
            valido = false;
        } else if (!regexEmail.test(email)) {
            $('#error-email').text('Por favor ingresa un email válido');
            valido = false;
        } else {
            $('#error-email').text('');
        }
        
        
        const telefono = $('#telefono').val().trim();
        if (telefono !== '') {
            const regexTelefono = /^\d{9}$/;
            if (!regexTelefono.test(telefono)) {
                $('#error-telefono').text('Por favor ingresa un número válido de 9 dígitos');
                valido = false;
            } else {
                $('#error-telefono').text('');
            }
        }
        
        
        const asunto = $('#asunto').val().trim();
        if (asunto === '') {
            $('#error-asunto').text('Por favor ingresa el asunto');
            valido = false;
        } else {
            $('#error-asunto').text('');
        }
        
        
        const mensaje = $('#mensaje').val().trim();
        if (mensaje === '') {
            $('#error-mensaje').text('Por favor ingresa tu mensaje');
            valido = false;
        } else if (mensaje.length < 10) {
            $('#error-mensaje').text('El mensaje debe tener al menos 10 caracteres');
            valido = false;
        } else {
            $('#error-mensaje').text('');
        }
        
        
        if (valido) {
            formContacto[0].reset();
            mensajeEnviado.fadeIn(300);
        }
    });

    
    cerrarMensaje.on('click', function() {
        mensajeEnviado.fadeOut(300);
    });

    
    formComentario.on('submit', function(e) {
        e.preventDefault();
        
        const nombre = $('#nombre').val().trim();
        const email = $('#email').val().trim();
        const comentario = $('#comentario').val().trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        let valido = true;
        
        if (nombre === '') {
            valido = false;
        }
        
        if (email === '' || !regexEmail.test(email)) {
            valido = false;
        }
        
        if (comentario === '' || comentario.length < 5) {
            valido = false;
        }
        
        if (valido) {
            modalComentario.fadeOut(300);
            $('body').css('overflow', 'auto');
            
           
            setTimeout(function() {
                alert('¡Gracias por tu comentario! Ha sido enviado correctamente.');
                formComentario[0].reset();
            }, 500);
        }
    });

    // Funcionalidad de compra (simulada)
    $(document).on('click', '.comprar-btn, .agregar-carrito', function(e) {
        e.preventDefault();
        
        const accion = $(this).hasClass('comprar-btn') ? 'comprado' : 'agregado al carrito';
        alert(`El producto ha sido ${accion} exitosamente.`);
        
        if (accion === 'comprado') {
            modal.fadeOut(300);
            $('body').css('overflow', 'auto');
        }
    });
});