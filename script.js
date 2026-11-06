
const brand = document.getElementById("brand");
const headline = document.getElementById("headline");
const description = document.getElementById("description");

const bgColor = document.getElementById("bgColor");
const textColor = document.getElementById("textColor");
const cta = document.getElementById("cta");

const adPreview = document.getElementById("adPreview");

function updateAd() {

    document.getElementById("showBrand").textContent =
        brand.value || "Your Brand";

    document.getElementById("showHeadline").textContent =
        headline.value || "Your Headline";

    document.getElementById("showDescription").textContent =
        description.value || "Your advertisement description";

    document.getElementById("showCTA").textContent = cta.value;

    adPreview.style.backgroundColor = bgColor.value;
    adPreview.style.color = textColor.value;
}

// Update preview when the user types or changes settings
[brand, headline, description, bgColor, textColor, cta]
    .forEach(element => {
        element.addEventListener("input", updateAd);
        element.addEventListener("change", updateAd);
    });

// Upload product image
document.getElementById("imageUpload")
    .addEventListener("change", function(event) {

        const file = event.target.files[0];

        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please select a valid image.");
                return;
            }

            const imageURL = URL.createObjectURL(file);

            const showImage = document.getElementById("showImage");

            showImage.src = imageURL;
            showImage.style.display = "block";
        }
    });

// Download advertisement as PNG
document.getElementById("downloadBtn")
    .addEventListener("click", function() {

        const ad = document.getElementById("adPreview");

        if (typeof html2canvas === "undefined") {
            alert("Download library could not load. Check your internet connection.");
            return;
        }

        html2canvas(ad, {
            scale: 3,
            useCORS: true,
            backgroundColor: null
        }).then(canvas => {

            const link = document.createElement("a");

            link.download = "facebook-ad-creative.png";
            link.href = canvas.toDataURL("image/png");

            link.click();

        }).catch(error => {
            console.error(error);
            alert("Unable to download. Please try again.");
        });
    });

// Initial preview
updateAd();
