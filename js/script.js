jQuery( '.drawer-item a' ).on( 'click', function() {
	jQuery( '#drawer-check' ).prop( 'checked', false );
});

jQuery( '.drawer-open, .drawer-close' ).on( 'click', function() {
	jQuery( '.drawer-open' ).toggleClass( 'm_checked' );
	jQuery( '.drawer-close' ).toggleClass( 'm_checked' );
	jQuery( '.drawer-content' ).toggleClass( 'm_checked' );
});
