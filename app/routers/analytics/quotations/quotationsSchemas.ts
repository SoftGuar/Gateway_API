export const quotationsSchemas = {
    countConvertedQuotations: {
        description: "Get the total count of converted quotations and conversion rate",
        response: {
            200: {
                type: "object",
                properties: {
                    ConvertedQuotations: { type: "number" },
                    taux_conversion: { type: "number" }
                }
            }
        }
    },
    averageTimeToConversion: {
        description: "Get the average time taken to convert quotations",
        response: {
            200: {
                type: "object",
                properties: {
                    averageTimeToConversion: { type: "number", nullable: true }
                }
            }
        }
    },
    mostFrequentlyQuotedProducts: {
        description: "Get the most frequently quoted products",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        product_id: { type: "number" },
                        product_name: { type: "string" },   
                        count: { type: "number" }
                    }
                }
            }
        }
    },
    productConversionRate: {
        description: "Get the conversion rate for each product",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        product_name: { type: "string" },
                        conversion_rate: { type: "number" }
                    }
                }
            }
        }
    },
    totalQuotationValueByProduct: {
        description: "Get the total quotation value grouped by product",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        product_name: { type: "string" },
                        total_value: { type: "number" }
                    }
                }
            }
        }
    },
    clientsWithMostUnconvertedQuotations: {
        description: "Get the clients with the most unconverted quotations",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        user_last_name: { type: "string" },
                        user_first_name: { type: "string" },
                        unconverted_count: { type: "number" }
                    }
                }
            }
        }
    },
    totalQuotationsCreated: {
        description: "Get the total number of quotations created",
        response: {
            200: {
                type: "object",
                properties: {
                    totalQuotationsCreated: { type: "number" }
                }
            }
        }
    },
    averageProductsPerQuotation: {
        description: "Get the average number of products per quotation",
        response: {
            200: {
                type: "object",
                properties: {
                    averageProductsPerQuotation: { type: "number", nullable: true }
                }
            }
        }
    },
    averageQuotationValue: {
        description: "Get the average value of quotations",
        response: {
            200: {
                type: "object",
                properties: {
                    averageQuotationValue: { type: "number", nullable: true }
                }
            }
        }
    }
};