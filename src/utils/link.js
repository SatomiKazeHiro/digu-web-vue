export default function linkTo(url, useVRouter = false) {
  if (useVRouter) this.$router.push(url);
  else {
    if (this.$store.getters.isPc) window.open(url, "_blank");
    else if (this.$store.getters.isMobile) this.$router.push(url);
    else window.open(url, "_blank");
  }
}
