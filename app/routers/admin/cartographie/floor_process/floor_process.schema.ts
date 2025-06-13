import { Type } from '@sinclair/typebox';

const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});


// ===== FLOOR PLAN PROCESSING SCHEMA =====
export const processFloorPlanSchema = {
  tags: ['Cartographie : Floor Plan Processing'],
  headers: authHeader,
  consumes: ['multipart/form-data'],
  body: Type.Object({
    file: Type.Any({ description: "Image file to process" }),
    grid_size: Type.Optional(Type.Number()),
    include_text_removal: Type.Optional(Type.Boolean()),
    include_walls_detection: Type.Optional(Type.Boolean()),
    include_furniture_detection: Type.Optional(Type.Boolean()),
    include_doors_detection: Type.Optional(Type.Boolean())
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        grid: Type.Array(Type.Array(Type.Number())),
        grid_dimensions: Type.Array(Type.Number()),
        grid_size: Type.Number(),
        original_image: Type.String(),
        no_text_image: Type.String(),
        walls_only: Type.String(),
        black_furniture: Type.String(),
        grid_visual: Type.String(),
        grid_with_lines: Type.String(),
        no_walls_doors: Type.String()
      })
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};