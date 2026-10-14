// Doctor directory: renders window.BADR_DOCTORS (doctors-data.js) as cards and
// filters them by name, branch and department.
//
// The live site also shows each doctor's current queue token; that is live
// data from Badr's own systems, so the demo leaves it out.
(function () {
  var doctors = window.BADR_DOCTORS || [];
  var grid = document.getElementById("doc-grid");
  var search = document.getElementById("doc-search");
  var branch = document.getElementById("doc-branch");
  var dept = document.getElementById("doc-dept");
  var count = document.getElementById("doc-count");
  var empty = document.getElementById("doc-empty");

  function esc(s) {
    return String(s || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function icon(name) {
    return '<svg class="icon"><use href="icons.svg#i-' + name + '" /></svg>';
  }

  doctors
    .map(function (d) { return d.dept; })
    .filter(function (v, i, a) { return a.indexOf(v) === i; })
    .sort()
    .forEach(function (name) {
      var o = document.createElement("option");
      o.textContent = name;
      dept.appendChild(o);
    });

  // A few portraits are missing on the live site itself; show initials instead.
  function photo(d) {
    if (d.img) return '<img class="doc__photo" src="' + esc(d.img) + '" alt="" loading="lazy" />';
    var initials = d.name.replace(/^Dr\.?\s*/i, "").split(/\s+/).slice(0, 2)
      .map(function (w) { return w.charAt(0).toUpperCase(); }).join("");
    return '<span class="doc__photo doc__photo--initials" aria-hidden="true">' + esc(initials) + "</span>";
  }

  function card(d) {
    var timing = d.timing && d.timing.length
      ? '<div class="doc__time"><b>' + icon("clock") + "Timing</b>" +
        d.timing.map(function (t) { return "<div>" + esc(t) + "</div>"; }).join("") +
        (d.off ? "<small>" + esc(d.off) + "</small>" : "") + "</div>"
      : "";
    var status = d.status
      ? '<div class="doc__status doc__status--away">' + esc(d.status) + "</div>"
      : "";
    return (
      '<article class="doc">' +
        '<div class="doc__top">' +
          photo(d) +
          "<div><h3>" + esc(d.name) + "</h3>" +
          '<p class="doc__dept">' + esc(d.dept) + "</p>" +
          '<p class="doc__branch">' + icon("pin") + esc(d.branch) + " Branch</p></div>" +
        "</div>" +
        '<div class="doc__mid"><div class="doc__facts">' +
          '<div class="doc__fact">' + icon("brief") + "<div><b>Qualifications</b>" + esc(d.quals) + "</div></div>" +
          '<div class="doc__fact">' + icon("award") + "<div><b>Experience</b>" + esc(d.exp) + "</div></div>" +
          '<div class="doc__fact"><span aria-hidden="true">' + esc(d.flag) + "</span><div><b>Nationality</b>" + esc(d.nat) + "</div></div>" +
        "</div>" + timing + "</div>" +
        status +
      "</article>"
    );
  }

  function render() {
    var q = search.value.trim().toLowerCase();
    var list = doctors.filter(function (d) {
      return (!q || d.name.toLowerCase().indexOf(q) !== -1) &&
        (!branch.value || d.branch === branch.value) &&
        (!dept.value || d.dept === dept.value);
    });
    grid.innerHTML = list.map(card).join("");
    empty.hidden = list.length > 0;
    count.textContent = "Showing " + list.length + " of " + doctors.length + " doctors";
  }

  search.addEventListener("input", render);
  branch.addEventListener("change", render);
  dept.addEventListener("change", render);
  render();
})();
