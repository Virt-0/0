  const breadcrumb = document.getElementById("breadcrumb");
  const links = breadcrumb.querySelectorAll("a");

  links.forEach((link, index) => {
    if (index < links.length - 1) {
      const sep = document.createElement("span");
      sep.textContent = " » ";
      sep.classList.add("sep");
      link.after(sep);
    }
});