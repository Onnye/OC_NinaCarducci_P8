const style = document.createElement("style");
(style.innerHTML =
  ".modal.show{opacity:1;transform:translateY(0);transition:opacity 0.5s ease,transform 0.5s ease}.modal.fade-in{opacity:1;transform:translateY(0);transition:opacity 0.5s ease,transform 0.5s ease}.modal.fade-out{opacity:0;transform:translateY(-100px);transition:opacity 0.5s ease,transform 0.5s ease}.modal{opacity:0;transform:translateY(-100px)}"),
  document.head.appendChild(style),
  (function () {
    function e(e, t) {
      const i = {
        columns: 3,
        lightBox: !0,
        lightboxId: "galleryLightbox",
        showTags: !0,
        tagsPosition: "bottom",
        navigation: !0,
      };
      t = { ...i, ...t };
      const o = [];
      function n(e, t) {
        const i = document.getElementById(t),
          o = i.querySelector(".lightboxImage");
        (o.src = e.src),
          (i.style.display = "block"),
          setTimeout(() => {
            i.classList.add("show"), i.classList.add("fade-in");
          }, 10),
          document.addEventListener("keydown", a);
      }
      function a(e) {
        "Escape" === e.key && d(t.lightboxId);
      }
      function d(e) {
        const t = document.getElementById(e);
        t.classList.remove("fade-in"),
          t.classList.add("fade-out"),
          setTimeout(() => {
            t.classList.remove("show", "fade-out"), (t.style.display = "none");
          }, 500),
          document.removeEventListener("keydown", a);
      }
      function l(e, t, i) {
        const o = document.querySelectorAll("img.gallery-item"),
          n = Array.from(o).find((t) => t.src === e.src),
          a = document.querySelector(".tags-bar .active-tag").dataset
            .imagesToggle,
          d = Array.from(o).filter(
            (e) => "all" === a || e.dataset.galleryTag === a
          ),
          l = d.indexOf(n),
          r = l > 0 ? l - 1 : d.length - 1;
        "prev" === i
          ? (e.src = d[r].src)
          : (e.src = d[l < d.length - 1 ? l + 1 : 0].src);
      }
      function r(e, t) {
        const i = document.createElement("div");
        (i.id = t),
          i.classList.add("modal"),
          (i.tabIndex = -1),
          (i.role = "dialog"),
          (i.innerHTML = `<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body">${
            e
              ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
              : ""
          }<img class="lightboxImage img-fluid" alt="Image affichée dans la modale"/>${
            e
              ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;">></div>'
              : ""
          }</div></div></div>`),
          document.body.appendChild(i),
          i.addEventListener("click", (e) => {
            e.target === i && d(t);
          });
      }
      !(function (e) {
        const t = document.createElement("div");
        t.classList.add("gallery-items-row", "row"), e.appendChild(t);
      })(e),
        t.lightBox && r(e, t.lightboxId, t.navigation),
        e.querySelectorAll(".gallery-item").forEach((i, n) => {
          !(function (e) {
            "IMG" === e.tagName && e.classList.add("img-fluid");
          })(i),
            (function (e) {
              document.querySelector(".gallery-items-row").appendChild(e);
            })(i),
            (function (e, t) {
              const i = document.createElement("div");
              i.classList.add("item-column", "mb-4"),
                "number" == typeof t
                  ? i.classList.add(`col-${Math.ceil(12 / t)}`)
                  : "object" == typeof t &&
                    (t.xs && i.classList.add(`col-${Math.ceil(12 / t.xs)}`),
                    t.sm && i.classList.add(`col-sm-${Math.ceil(12 / t.sm)}`),
                    t.md && i.classList.add(`col-md-${Math.ceil(12 / t.md)}`),
                    t.lg && i.classList.add(`col-lg-${Math.ceil(12 / t.lg)}`),
                    t.xl && i.classList.add(`col-xl-${Math.ceil(12 / t.xl)}`)),
                i.appendChild(e),
                document.querySelector(".gallery-items-row").appendChild(i);
            })(i, t.columns);
          const a = i.dataset.galleryTag;
          t.showTags && a && !o.includes(a) && o.push(a);
        }),
        t.showTags &&
          (function (e, t, i) {
            const o = document.createElement("ul");
            o.classList.add("my-4", "tags-bar", "nav", "nav-pills"),
              (o.innerHTML =
                '<li class="nav-item"><span class="nav-link active active-tag" data-images-toggle="all">Tous</span></li>'),
              i.forEach((e) => {
                const t = document.createElement("li");
                t.classList.add("nav-item"),
                  (t.innerHTML = `<span class="nav-link" data-images-toggle="${e}">${e}</span>`),
                  o.appendChild(t);
              }),
              "bottom" === t
                ? e.appendChild(o)
                : "top" === t && e.insertBefore(o, e.firstChild);
          })(e, t.tagsPosition, o),
        (e.style.display = "block"),
        e.addEventListener("click", (i) => {
          t.lightBox && "IMG" === i.target.tagName && n(i.target, t.lightboxId);
        }),
        document.addEventListener("click", (e) => {
          e.target.classList.contains("nav-link") &&
            !(function (e) {
              if (e.target.classList.contains("active-tag")) return;
              document
                .querySelector(".active.active-tag")
                .classList.remove("active", "active-tag"),
                e.target.classList.add("active-tag", "active");
              const t = e.target.dataset.imagesToggle;
              document.querySelectorAll(".gallery-item").forEach((e) => {
                const i = e.closest(".item-column");
                i.style.display =
                  "all" === t || e.dataset.galleryTag === t ? "block" : "none";
              });
            })(e),
            e.target.classList.contains("mg-prev") &&
              l(document.querySelector(".lightboxImage"), t.lightboxId, "prev"),
            e.target.classList.contains("mg-next") &&
              l(document.querySelector(".lightboxImage"), t.lightboxId, "next");
        });
    }
    window.mauGallery = e;
  })(),
  document.addEventListener("DOMContentLoaded", function () {
    const e = document.querySelector(".gallery");
    e &&
      mauGallery(e, {
        columns: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3 },
        lightBox: !0,
        lightboxId: "myAwesomeLightbox",
        showTags: !0,
        tagsPosition: "top",
      });
  });
