
/* =========================================
   01. ELEMENTOS PRINCIPAIS
========================================= */

const modal = document.getElementById("memoryModal");

const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalImage = document.getElementById("modalImage");

const modalClose = document.getElementById("modalClose");
const modalFooterClose = document.getElementById("modalFooterClose");

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("mainNav");


/* =========================================
   02. ABRIR MODAIS DE MEMÓRIAS
========================================= */

const memoryButtons = document.querySelectorAll("[data-open-modal]");

memoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const title = button.dataset.title || "Memória escolar";

        const content = button.dataset.content || "Nenhum conteúdo disponível.";

        modalTitle.textContent = title;

        modalText.textContent = content;

        modalImage.hidden = true;
        modalImage.removeAttribute("src");
        modalImage.alt = "";

        openModal();

    });

});


/* =========================================
   03. ABRIR MODAL
========================================= */

function openModal() {

    if (!modal.open) {
        modal.showModal();
    }

    document.body.classList.add("modal-open");

}


/* =========================================
   04. FECHAR MODAL
========================================= */

function closeModal() {

    if (modal.open) {
        modal.close();
    }

    document.body.classList.remove("modal-open");

}


modalClose.addEventListener("click", closeModal);

modalFooterClose.addEventListener("click", closeModal);


modal.addEventListener("close", () => {

    document.body.classList.remove("modal-open");

});


/* =========================================
   05. FECHAR CLICANDO FORA DA JANELA
========================================= */

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }

});


/* =========================================
   06. GALERIA DE FOTOGRAFIAS
========================================= */

const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const imagePath = item.dataset.image;

        const caption = item.dataset.caption || "Fotografia";

        modalTitle.textContent = caption;

        modalText.textContent = "Registro fotográfico do memorial escolar.";

        modalImage.src = imagePath;

        modalImage.alt = caption;

        modalImage.hidden = false;

        openModal();

    });

});


/* =========================================
   07. MENU PARA CELULARES
========================================= */

menuToggle.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

});


/* FECHAR MENU AO CLICAR EM UM LINK */

const navigationLinks = navigation.querySelectorAll("a");

navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Abrir menu");

    });

});


/* =========================================
   08. LEITOR SANFONADO DAS REDAÇÕES
========================================= */

const essayItems = document.querySelectorAll(".essay-item");

essayItems.forEach(item => {

    item.addEventListener("toggle", () => {

        if (item.open) {

            essayItems.forEach(otherItem => {

                if (otherItem !== item) {
                    otherItem.open = false;
                }

            });

        }

    });

});


/* =========================================
   09. ANIMAÇÕES AO ROLAR A PÁGINA
========================================= */

const animatedElements = document.querySelectorAll(
    ".section-heading, " +
    ".memory-card, " +
    ".window, " +
    ".timeline-item, " +
    ".gallery-item, " +
    ".essay-item, " +
    ".closing-card"
);

animatedElements.forEach(element => {

    element.classList.add("reveal");

});


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    animatedElements.forEach(element => {

        observer.observe(element);

    });

} else {

    animatedElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* =========================================
   10. DESTAQUE DO MENU NA NAVEGAÇÃO
========================================= */

const pageSections = document.querySelectorAll("main section[id]");

const navLinks = document.querySelectorAll(
    '.navigation a[href^="#"]'
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    }, {
        rootMargin: "-25% 0px -65% 0px"
    });

    pageSections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =========================================
   11. FECHAR MENU COM ESC
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        navigation.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Abrir menu");

    }

});


/* =========================================
   12. MENSAGEM DE INICIALIZAÇÃO
========================================= */

console.log("Memorial de formatura carregado com sucesso.");

console.log("Estrutura preparada para receber as memórias pessoais.");

console.log("15 espaços de redação disponíveis.");

