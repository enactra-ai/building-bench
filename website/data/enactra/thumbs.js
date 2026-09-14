
            document.querySelectorAll(".input-thumb").forEach((button) => {
              button.addEventListener("click", () => {
                const preview = document.getElementById("geisel-input-preview");
                const label = document.getElementById("geisel-input-label");
                preview.src = button.querySelector("img").src;
                preview.alt = button.dataset.alt;
                label.textContent = button.dataset.label;
                document.querySelectorAll(".input-thumb").forEach((item) => item.classList.remove("is-active"));
                button.classList.add("is-active");
              });
            });
            document.querySelector(".input-thumb.is-active")?.click();
          