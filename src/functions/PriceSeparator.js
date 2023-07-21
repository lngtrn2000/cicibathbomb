function numberWithCommas(x) {
    var cx = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return cx + " VND"
}

export default numberWithCommas