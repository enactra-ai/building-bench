
            document.querySelectorAll(".input-thumb").forEach((button) => {
              button.addEventListener("click", () => {
                const preview = document.getElementById("case-input-preview");
                const label = document.getElementById("case-input-label");
                preview.src = button.querySelector("img").src;
                preview.alt = button.dataset.alt;
                label.textContent = button.dataset.label;
                document.querySelectorAll(".input-thumb").forEach((item) => item.classList.remove("is-active"));
                button.classList.add("is-active");
              });
            });
            document.querySelector(".input-thumb.is-active")?.click();
                      document.querySelector(".task-more")?.addEventListener("click", (event) => {
              const full = document.getElementById("taskFull");
              if (!full) return;
              event.preventDefault();            // the page's own hash is the share state; leave it alone
              full.open = true;
              full.scrollIntoView({ behavior: "smooth", block: "start" });
            });
