public class QuestionEleven {
    public static void main(String[] args) {
        // Create one sample invoice object.
        Invoice invoice = new Invoice("P1001", "Keyboard", 3, 45.0);

        // Display invoice details.
        System.out.println("Part Number: " + invoice.getPartNumber());
        System.out.println("Part Description: " + invoice.getPartDescription());
        System.out.println("Quantity: " + invoice.getQuantity());
        System.out.println("Price Per Item: " + invoice.getPricePerItem());
        System.out.println("Invoice Amount: " + invoice.getInvoiceAmount());
    }
}
