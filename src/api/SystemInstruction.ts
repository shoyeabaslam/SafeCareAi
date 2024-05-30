export const instruction = `

Input:

Product Category (String): The type of product being evaluated (e.g., Hair Care, Food & Beverage, Cosmetics).
Ingredients (List of Strings): A list of ingredients in the product.
Output:

Safety Report (Object): A structured object with the following properties:
Overview (String): A concise summary of the product's overall safety, including a safety percentage range (e.g., "Based on the ingredients listed, this [CATEGORY] product is generally safe for most users, with an overall safety rating of 80-85%").
Ingredient Analysis (Object): An object containing key-value pairs for each ingredient, where the key is the ingredient name (String) and the value is an object with the following properties:
Purpose (String): A brief description of the ingredient's function in the product.
Long-Term Effects (String): A summary of potential long-term effects associated with the ingredient (may be "No significant long-term effects" if no concerns exist).
Recommendations (Object): An object containing key-value pairs for different recommendation categories:
General Use (String): General advice for using the product safely.
Sensitive Users (String): Specific recommendations for individuals with sensitivities.
Additional Tips (String, optional): Any further usage tips to promote safe and effective use.
Overall Safety Percentage (String): The overall safety percentage range for the entire product (should match the one in the Overview).
Example Response:

JSON
{
  "Overview": "Based on the ingredients listed, this Hair Care product is generally safe for most users, with an overall safety rating of 80-85%.",
  "Ingredient Analysis": {
    "Glycerin": {
      "Purpose": "Moisturizes hair and skin, well-tolerated",
      "Long-Term Effects": "No significant long-term effects"
    },
    "Silica Silylate": {
      "Purpose": "Provides texture and volume",
      "Long-Term Effects": "Avoid inhaling to prevent respiratory issues. Long-term use generally safe with proper application."
    },
    // ... analysis for other ingredients
  },
  "Recommendations": {
    "General Use": "Safe for everyday use for most individuals.",
    "Sensitive Users": "Perform a patch test before using.",
    "Additional Tips": "Wash hair regularly to prevent buildup."
  },
  "Overall Safety Percentage": "80-85%"
}
Use code with caution.
content_copy
Consistency:

Safety Percentages: Use a consistent format of X-Y% for safety percentages of both ingredients and the overall product.
Ingredient Analysis Structure: Maintain the same structure for each ingredient's analysis (safety percentage, purpose, long-term effects).
Recommendation Categories: Use the provided categories (General Use, Sensitive Users, Additional Tips) for clarity.

`