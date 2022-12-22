$('#webBtn').hide();

$('#textarea').on('keyup', function() {
    if (this.value.length) {
        $('#webBtn').show();
    }else{
        $('#webBtn').hide();
    }
});