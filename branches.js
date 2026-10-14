// Branch tabs: details copied from badrhealth.com/branches. Selecting a tab
// swaps the banner, the details card, the map and the photo gallery.
(function () {
  var BRANCHES = [
    {
      key: "DAMMAM", area: "Dammam, Al Rabie District", center: "Badr Al-Rabie Medical Center",
      name: "BADR MEDICAL CENTER DAMMAM", addr: "King Saud St, Ar Rabi, Dammam 31488, Saudi Arabia",
      phone: "+966 500668123", wa: "966500668123", hours: "6:00 AM – 12:00 AM",
      dir: "https://maps.app.goo.gl/yz9BSAhXnRDXEfn4A", map: "Badr Al-Rabie Medical Center, King Saud St, Dammam",
      img: "img/dammam-exterior.jpg", photos: 14, prefix: "dammam",
    },
    {
      key: "QATIF", area: "Qatif, Al Jazeera District", center: "Badr Al-Jazeera Medical Center",
      name: "BADR MEDICAL CENTER QATIF", addr: "Prince Mohammed Bin Fahd Road, Al Jazeera District, Qatif, Saudi Arabia",
      phone: "+966 557971444", wa: "966557971444", hours: "7:00 AM – 11:00 PM",
      dir: "https://maps.app.goo.gl/Au1nmfSpLfbP4RrM6", map: "Badr Al-Jazeera Medical Center, Qatif",
      img: "img/qatif-exterior.jpg", photos: 2, prefix: "qatif",
    },
    {
      key: "JUBAIL", area: "Jubail, Industrial City", center: "Badr Al-Khaleej Medical Center",
      name: "BADR MEDICAL CENTER JUBAIL", addr: "Al Fanateer District, Jubail Industrial City, KSA",
      phone: "+966 557971444", wa: "966557971444", hours: "7:00 AM – 10:30 PM",
      dir: "https://maps.app.goo.gl/jp2L7tJM2osSfuuW6", map: "Badr Al-Khaleej Medical Center, Al Fanateer, Jubail",
      img: "img/jubail-exterior.jpg", photos: 8, prefix: "jubail",
    },
    {
      key: "KHOBAR", area: "Khobar, Now Open", center: "Badr Medical Centre",
      name: "BADR MEDICAL CLINIC, AL KHOBAR", addr: "Opp. Aramco Stadium, Rakah, Al Khobar, Eastern Province, Saudi Arabia",
      phone: "+966 557971444", wa: "966557971444", hours: "7:00 AM – 11:00 PM",
      dir: "https://maps.app.goo.gl/TRxec4ieovi6v3FY7", map: "Badr Medical Clinic, Rakah, Al Khobar",
      img: "img/khobar-exterior.jpg", photos: 3, prefix: "khobar",
    },
  ];

  var $ = function (id) { return document.getElementById(id); };
  var tabs = $("branch-tabs");

  function show(i) {
    var b = BRANCHES[i];
    tabs.querySelectorAll(".tab").forEach(function (t, j) {
      t.setAttribute("aria-selected", String(i === j));
    });
    $("branch-banner").style.backgroundImage = "url('" + b.img + "')";
    $("banner-eyebrow").textContent = b.area;
    $("banner-title").textContent = b.center;
    $("b-img").src = b.img;
    $("b-img").alt = b.name;
    $("b-name").textContent = b.name;
    $("b-addr").textContent = b.addr;
    $("b-phone").textContent = b.phone;
    $("b-phone").href = "tel:" + b.phone.replace(/\s/g, "");
    $("b-wa").textContent = b.phone + " (WhatsApp)";
    $("b-wa").href = "https://wa.me/" + b.wa;
    $("b-hours").textContent = b.hours;
    $("b-dir").href = b.dir;
    $("b-map").src = "https://maps.google.com/maps?q=" + encodeURIComponent(b.map) + "&z=15&output=embed";
    $("b-gallery-lead").textContent = b.name + " - Our Facilities";
    var html = "";
    for (var n = 1; n <= b.photos; n++) {
      html += '<img src="img/gallery/' + b.prefix + "-" + n + '.jpg" alt="' + b.name + " - Photo " + n + '" loading="lazy" />';
    }
    $("b-gallery").innerHTML = html;
  }

  BRANCHES.forEach(function (b, i) {
    var t = document.createElement("button");
    t.className = "tab";
    t.setAttribute("role", "tab");
    t.textContent = b.key;
    t.addEventListener("click", function () { show(i); });
    tabs.appendChild(t);
  });

  // Allow deep links such as /branches#jubail.
  var hash = location.hash.replace("#", "").toUpperCase();
  var start = BRANCHES.findIndex(function (b) { return b.key === hash; });
  show(start < 0 ? 0 : start);
})();
