// Annapurna Canteen - Automation Logic Matrix
let cart = {};
let cumulativeRevenue = 0;
let totalRegisteredOrders = 0;
let activeQueueCount = 0;

// Food Database Elements Array
const itemPrices = {
    "coffee": 15, "tea": 15, "somasa": 20, "biscuit": 10,
    "dos": 30, "idil": 20, "puri": 35, "chattani": 10,
    "potato curry": 15, "rice": 40, "birayni": 70,
    "chicken birayni": 100, "chicken curry": 80,
    "mutton birayni": 150, "mutton curry": 130,
    "chicken lollipops": 90, "thumsup": 20,
    "lemon juice": 25, "sandwich": 40, "bread omelet": 35
};

// Add to Cart Logic Loop
function updateItemQuantity(itemName, quantity) {
    if (quantity <= 0) {
        delete cart[itemName];
    } else {
        cart[itemName] = {
            price: itemPrices[itemName] || 0,
            qty: parseInt(quantity)
        };
    }
    calculateTotalPayableSum();
}

// Calculate Total Matrix Costs
function calculateTotalPayableSum() {
    let totalItems = 0;
    let totalPayable = 0;

    for (let key in cart) {
        totalItems += cart[key].qty;
        totalPayable += cart[key].qty * cart[key].price;
    }

    // Update UI elements in HTML
    document.getElementById("total-selected-elements").innerText = totalItems;
    document.getElementById("total-payable-sum").innerText = "₹" + totalPayable;
    return totalPayable;
}

// Finalize Campus Transaction Node
function verifyAndFinalizeOrder() {
    const studentId = document.getElementById("student-roll-id").value;
    const mobileNumber = document.getElementById("mobile-contact-terminal").value;
    const paymentGateway = document.getElementById("payment-routing-gateway").value;
    const totalSum = calculateTotalPayableSum();

    if (!studentId || !mobileNumber || totalSum === 0) {
        alert("Transaction Aborted: Invalid identification variables or empty cart.");
        return;
    }

    // Increment Metrics
    totalRegisteredOrders++;
    activeQueueCount++;
    cumulativeRevenue += totalSum;

    // Refresh Analytics UI
    document.getElementById("gross-cumulative-revenue").innerText = "₹ " + cumulativeRevenue;
    document.getElementById("total-registered-orders").innerText = totalRegisteredOrders;
    document.getElementById("active-pipeline-queue").innerText = activeQueueCount;

    // Generate Invoice Breakdown Sheet
    renderInvoiceSheet(studentId, paymentGateway, totalSum);
}

// Render Data Breakdown Sheet
function renderInvoiceSheet(studentId, gateway, totalSum) {
    const transactionId = "TXN-" + Math.floor(100000 + Math.random() * 900000);
    const timeStamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    document.getElementById("invoice-txn-id").innerText = transactionId;
    document.getElementById("invoice-timestamp").innerText = timeStamp;
    document.getElementById("invoice-student-id").innerText = studentId;
    document.getElementById("invoice-routing-link").innerText = gateway;
    document.getElementById("invoice-net-amount").innerText = "₹" + totalSum.toFixed(2);
    
    alert("Invoice generated! Please present the validation token at the Kitchen Desk.");
}
