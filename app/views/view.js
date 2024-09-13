export class View {
  reloadPage() {
    return { reload: true };
  }

  productsPage(res) {
    return { redirect: "/" };
  }

  loginPage(res) {
    return { redirect: "/login" };
  }
}
