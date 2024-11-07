// Fonction pour charger dynamiquement un composant
window.loadComponent = (path, id) => {
  const content = document.getElementById(id);
  fetch(`components/${path}.html`)
    .then((response) => response.text())
    .then((html) => {
      // Injecter le HTML dans le div #content
      content.innerHTML = html;

      // Rechercher et exécuter les balises <script> après avoir injecté le contenu
      const scripts = content.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {
          // Si le script a un attribut src, on le recharge
          newScript.src = script.src;
        } else {
          // Sinon, on copie le contenu du script
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript); // Injecter le nouveau script dans le body pour l'exécuter
      });

      // Mettre à jour l'URL dans l'historique sans rechargement de page
      window.history.pushState({ path }, "", `#${path}`);
    })
    .catch((err) =>
      console.error(`Erreur lors du chargement du composant : ${err}`)
    );
};

window.loadHTML = (id, path) => {
  fetch(`${path}.html`)
    .then((response) => response.text())
    .then((html) => {
      const content = document.getElementById(id);
      // Injecter le HTML dans le div #content
      content.innerHTML = html;
    })
    .catch((err) =>
      console.error(`Erreur lors du chargement de l'html : ${err}`)
    );
};

// Gérer la navigation par les liens
document.querySelectorAll("a[data-path]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    const path = e.target.getAttribute("data-path");
    loadComponent(path); // Charger le composant correspondant
  });
});
